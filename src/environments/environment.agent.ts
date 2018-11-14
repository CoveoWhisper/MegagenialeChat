import { UserType } from './../app/models/usertype';
export const environment = {
    production: false,
    userType: UserType.AGENT,
    // ENDPOINT: 'https://whisper-dev.us-east-1.elasticbeanstalk.com/whisper',
    SOCKET_ENDPOINT: 'http://localhost:8080'
};
  