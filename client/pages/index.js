import axios from 'axios';

const LandingPage = ({currentUser})=> {    
    console.log("Current User is ", currentUser);
    return <h1>Landing Page</h1>;
}

LandingPage.getInitialProps = async({req}) =>{    
    if(typeof window === "undefined")
    {
        console.log("I am running from server");
        const {data} = await axios.get('https://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser',
            {
                headers: req.headers                
            });

        return data;
    }
    else
    {
        console.log("I am running from browser");
        const {data} = await axios.get('/api/users/currentuser');
        return data;
    }
    return response.data;
}

export default LandingPage;