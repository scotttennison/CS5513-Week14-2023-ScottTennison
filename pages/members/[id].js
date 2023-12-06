import Layout from '../../components/layout';
import { getMembersIds, getMembersData } from '../../lib/dataMembers';



export async function getStaticProps({ params }) {
  const itemMembers = await getMembersData(params.id);

  return {
    props: {
      itemMembers
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const data = await getMembersIds();
  const paths = data
    .filter(item => item?.id != null)
    .map(item => ({
      params: {
        id: item.id
      },
    }));
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemMembers }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-header text-white">
          <h5 className="card-title">{itemMembers.post_title}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2"><strong>New Members</strong></h6>
          <ul>
            {itemMembers.meta_values.split(', ').map((metaValue, index) => (
              <li key={index}>{metaValue}</li>
            ))}
          </ul>
        </div>
        <div className="card-footer bg-light">
        </div>
      </article>
    </Layout>

  );
}

