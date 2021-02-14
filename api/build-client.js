import axios from 'axios';

export default ({req}) => {
  if(typeof window === "undefined")
  {
    //We are on the server

    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  }
  else
  {
    //We are on the client browser
    return axios.create({
      baseURL: '/'
    })
  }
};