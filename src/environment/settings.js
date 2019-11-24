import environment from '../environment/environment.json';

export default function(){
    const env =process.env.current_environment || 'development';
    return environment[env];
}

