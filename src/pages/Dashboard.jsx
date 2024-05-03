import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Box, Grid, Stack } from "@mui/material";
import { Oval } from "react-loader-spinner";
import JobRoleFilter from "../components/JobRoleFillter";
import LocationFilter from "../components/LocationFillter";

const Dashboard = () => {
  const [jobData, setJobData] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      limit: 12,
      offset: page * 10,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const res = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await res.json();
      setJobData((prevData) => [...prevData, ...data.jdList]);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterJobs = (jobList, filters) => {
    const filteredByRole = filters.role
      ? jobList.filter((item) =>
          item.jobRole.toLowerCase().includes(filters.role.toLowerCase())
        )
      : jobList;

    const filteredByLocation = filters.location
      ? filteredByRole.filter((item) =>
          item.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      : filteredByRole;

    return filteredByLocation;
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "flex-start",
            marginLeft: 8,
          }}
        >
          <Stack direction={"row"} spacing={3} style={{ margin:"15px 10px 0 0" }}>
            <JobRoleFilter filters={filters} onChange={handleFilterChange} />
            <LocationFilter filters={filters} onChange={handleFilterChange} />
          </Stack>
        </Box>

        <Grid container my={4}>
          {filterJobs(jobData, filters).map((job, index) => (
            <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
