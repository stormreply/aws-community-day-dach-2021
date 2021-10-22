import { Amplify } from 'aws-amplify';

const getConfig = async (url: string): Promise<any> => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const {
        BackendStack: { restApiEndpoint: endpoint },
      } = data;
      return {
        API: {
          endpoints: [
            {
              name: 'FizzBuzzAPI',
              endpoint,
            },
          ],
        },
      };
    });
};

export default async () => {
  Amplify.configure(await getConfig('./outputs.json'));
};
