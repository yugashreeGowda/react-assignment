import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Grid, Pagination as SUIPagination } from "semantic-ui-react";
import { setUsers } from "../store/usersSlice";
import Loader from "./Loader";

const Pagination = ({ setSelectedUser }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data: metaData } = await axios.get(
          "https://reqres.in/api/users"
        );
        const { data: response } = await axios.get(
          `https://reqres.in/api/users?per_page=${
            parseInt(metaData.per_page) * parseInt(metaData.total_pages)
          }`
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handlePaginationChange = (e, { activePage }) => {
    push(`/${users[activePage - 1]?.id}`);
    setSelectedUser(users[activePage - 1]?.id);
  };

  return (
    <Grid textAlign="center" columns={3}>
      <Grid.Row>
        {loading ? (
          <Loader />
        ) : (
          <SUIPagination
            totalPages={users.length}
            onPageChange={handlePaginationChange}
          />
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Pagination;
