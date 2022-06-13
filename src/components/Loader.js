import { Dimmer, Loader as SUILoader, Segment } from "semantic-ui-react";

const Loader = () => {
  return (
    <Segment>
      <Dimmer active>
        <SUILoader indeterminate>Preparing Files</SUILoader>
      </Dimmer>
    </Segment>
  );
};

export default Loader;
