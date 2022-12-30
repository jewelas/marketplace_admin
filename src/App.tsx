import { useState } from "react";

import Layout from "page";
import Landing from "page/Tokenshow";

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout open={open} setOpen={setOpen}>
      <Landing setOpen={setOpen} />
    </Layout>
  );
};

export default App;
