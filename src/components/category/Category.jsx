import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cliw4abwt0pza01uh0kc9913j/master')

const QUERY = gql`
{
    category {
        createdAt
        id
        name
        slug
        publishedAt
        updatedAt
        categoryImage {
          id,
          url
        }
        lists {
            id,
            image{
              url
            }
          }
      }
}
`

const getData = async () => {
    try {
        const { category } = await graphcms.request(QUERY);
        return category;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const Category = async () => {
    const data = await getData()
    return (
        <section id="category">
            <div className="title">
                <h3>
                    Kateqoriyalar
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                </h3>
            </div>
            <div className="container">
                <div className="row">
                    {
                        data.length > 0 ? (
                            data.map((el, idx) => (
                                <Link href={`/category/${el.slug}`} key={idx}>
                                    <div className="category-item">
                                        <img src={el.categoryImage.url} alt="categories" />
                                        <p>{el.name}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className='none'>
                                <h3>
                                    Kateqoriya əlave edilməyib !
                                </h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Category;
