import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("Current User is ", currentUser);
  return currentUser ? (
    <h1>Welcome {currentUser.email}</h1>
  ) : (
    <h1>You are viewing as GUEST!</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("Landing Page Current User is ", context);

  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
