import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Icon, Image, Grid, Header, Segment } from "semantic-ui-react";
import Loader from "./Loader";

const UserCard = ({ selectedUser, setSelectedUser }) => {
  const { userId = selectedUser } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { first_name, last_name, email, avatar } = user;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://reqres.in/api/users/${selectedUser || userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error.message);
        setUser({});
      } finally {
        setLoading(false);
      }
    };
    fetchUser();

    return () => setUser({});
  }, [userId, selectedUser, setSelectedUser]);

  const isUserEmpty =
    user &&
    Object.keys(user).length === 0 &&
    Object.getPrototypeOf(user) === Object.prototype;

  return (
    <Segment>
      <Grid textAlign="center" columns={3}>
        <Grid.Row>
          {userId ? (
            loading ? (
              <Loader />
            ) : isUserEmpty ? (
              <Segment placeholder>
                <Header icon>
                  <Icon name="user" />
                  User is not found.
                </Header>
              </Segment>
            ) : (
              <Card>
                <Image src={avatar} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>User Details</Card.Header>
                  <Card.Description>
                    <p>
                      <b>First Name: </b> {first_name}
                    </p>
                    <p>
                      <b>Last Name: </b> {last_name}
                    </p>
                    <p>
                      <b>Email: </b> {email}
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          ) : (
            <Segment placeholder>
              <Header icon>
                <Icon name="user" />
                User is not selected. Please click on any button below.
              </Header>
            </Segment>
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default UserCard;
