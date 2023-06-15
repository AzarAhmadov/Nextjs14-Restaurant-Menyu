import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cliw4abwt0pza01uh0kc9913j/master');

const QUERY = gql`
{
    restaurans {
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
        const restaurant = await graphcms.request(QUERY);
        return restaurant;
    } catch (error) {
        console.error('Error fetching Restoran:', error);
        return [];
    }
};


const Hero = async () => {
    const data = await getDataRestoran();
    return (
        <section id='hero'>
            <section id='hero'>
                <img src={data.restaurans[0].image?.url} alt="Restaurant-bg" />
                <div className="hero-item">
                    <h1 className="item-text">
                        {data.restaurans[0].name}
                    </h1>
                </div>
            </section>
        </section>
    );
};

export default Hero;
