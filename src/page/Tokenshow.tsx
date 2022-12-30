import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Box, Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useTokenContract } from "hook/useContract";

interface Props {
  setOpen: any;
}

const Landing: React.FC<Props> = ({ setOpen }) => {
  const contract = useTokenContract();
  const { account } = useWeb3React();
  const [superAdmin, setSuperAdmin] = useState("");
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [admins, setAdmins] = useState([]);

  useMemo(async () => {
    const { data } = await axios.get(
      "https://testserver.artwise.dog/collection"
    );
    const {
      data: { users },
    } = await axios.get("https://testserver.artwise.dog/admin");
    setCollections(data);
    setAdmins(users);
  }, []);
  useMemo(async () => {
    setSuperAdmin(await contract?.owner().call());
  }, [contract]);
  const accept = async (data: any) => {
    const { data: tmp } = await axios.post(
      "https://testserver.artwise.dog/collection/verify",
      {
        collectionId: data.collectionId,
      }
    );
    setCollections(tmp);
  };
  const register = async () => {
    if (name === "" || address === "") alert("Empty values");
    else {
      try {
        const {
          data: { success, users },
        } = await axios.post("https://testserver.artwise.dog/admin", {
          name,
          address: address.toLowerCase(),
        });
        if (success) {
          alert("Added");
          setAdmins(users);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const remove = async (address: any) => {
    try {
      const {
        data: { success, users },
      } = await axios.delete("https://testserver.artwise.dog/admin", {
        data: {
          address,
        },
      });
      if (success) {
        alert("Removed");
        setAdmins(users);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <StyledContainer>
      <Box position="fixed" top="10px" right="10px">
        {account ? (
          <Button variant="contained">{account}</Button>
        ) : (
          <Button variant="contained" onClick={() => setOpen(true)}>
            connect wallet
          </Button>
        )}
      </Box>
      {superAdmin && account === superAdmin && (
        <>
          <h2>Admins</h2>
          <Box display="flex" flexDirection="column">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
              style={{ marginTop: 16, marginBottom: 16 }}
            />
          </Box>
          <Button variant="contained" onClick={register}>
            Add admin
          </Button>
          {admins.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((x: any, i) => (
                  <tr key={i}>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>
                      <Box>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => remove(x.address)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {((superAdmin && account === superAdmin) ||
        admins.some((x: any) => x.address === account?.toLowerCase())) && (
        <>
          <h2 style={{ marginTop: 100 }}>Collections</h2>
          {collections.length > 0 && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th style={{ textAlign: "center" }}>Verified</th>
                    <th style={{ textAlign: "center" }}>Request</th>
                  </tr>
                </thead>
                <tbody>
                  {collections
                    .filter(
                      (x, i) => i >= (page - 1) * 10 && i <= page * 10 - 1
                    )
                    .map((x: any, i) => (
                      <tr key={i}>
                        <td>{x.name}</td>
                        <td>
                          <Box>
                            <img
                              src={
                                x.ownerInfo[0]?.avatar ??
                                "img/user/user_avatar.gif"
                              }
                              alt=""
                              width="32px"
                              height="32px"
                            />
                            {x.owner}
                          </Box>
                        </td>
                        <td>
                          {x.verified === 1 && (
                            <Box>
                              <img src="img/verified.png" alt="" width="32px" />
                            </Box>
                          )}
                        </td>
                        <td>
                          {x.verified === 0 && (
                            <Box>
                              <Button
                                variant="outlined"
                                onClick={() => accept(x)}
                              >
                                Accept
                              </Button>
                              <Button variant="outlined" color="secondary">
                                Decline
                              </Button>
                            </Box>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination>
                <Button
                  variant="contained"
                  onClick={() => setPage((x) => (x -= 1))}
                >
                  Prev
                </Button>
                <input
                  type="number"
                  style={{ width: "100px" }}
                  value={page}
                  pattern="/[^0-9.]/g"
                  onChange={(e: any) => setPage(parseInt(e.target.value))}
                />
                <Button
                  variant="contained"
                  onClick={() => setPage((x) => (x += 1))}
                >
                  Next
                </Button>
              </Pagination>
            </>
          )}
        </>
      )}
    </StyledContainer>
  );
};

const Pagination = styled(Box)`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledContainer = styled(Box)`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h2 {
    color: white;
    margin-bottom: 32px;
  }
  table {
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:nth-child(odd) {
      background-color: white;
    }

    tr:hover {
      background-color: #ddd;
    }

    td {
      padding: 12px;
    }
    th {
      padding: 12px;
      text-align: left;
      background-color: #04aa6d;
      color: white;
    }
  }
  tbody tr {
    td:nth-of-type(2) > div {
      display: flex;
      align-items: center;
      > img {
        margin-right: 16px;
        border-radius: 50%;
      }
    }
    td:nth-of-type(3) > div {
      display: flex;
      justify-content: center;
    }
    td:nth-of-type(4) > div {
      display: flex;
      justify-content: center;
      gap: 16px;
      align-items: center;
    }
  }
`;

export default Landing;
