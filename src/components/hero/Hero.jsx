
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cliw4abwt0pza01uh0kc9913j/master');

const QUERY = gql`
{
    restaurants {
        id
        name
      image{
        url
      }
      }
}
`;

const getDataRestoran = async () => {
    try {
        const restaurants = await graphcms.request(QUERY);
        return restaurants;
    } catch (error) {
        console.error('Error fetching Restoran:', error);
        return [];
    }
};


const Hero = async () => {
    const data = await getDataRestoran();

    return (
        <section id='hero'>
            {data.restaurants[0] && data.restaurants[0].image && (
                <section id='hero'>
                    <img src={data.restaurants[0].image.url} alt="Restaurant-bg" />
                    <div className="hero-item">
                        <h1 className="item-text">
                            {data.restaurants[0].name && (
                                <div>{data.restaurants[0].name}</div>
                            )}
                        </h1>
                    </div>
                </section>
            )}

        </section>
    );
};

export default Hero;
