import Layout from '../../components/layout';
import { getEventsIds, getEventsData } from '../../lib/dataEvents';
import { getMembersIds, getMembersData } from '../../lib/dataMembers';

export async function getStaticProps({ params }) {
  const itemEvents = await getEventsData(params.id);

  return {
    props: {
      itemEvents
    }
  };
}

export async function getStaticPaths() {
  const data = await getEventsIds(); 
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

export default function Entry({ itemEvents }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-header text-white">
          <h5 className="card-title">{itemEvents.post_title}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2"><strong>New Events</strong> {itemEvents.meta_values}</h6>
        </div>
        <div className="card-footer bg-light">
        </div>
      </article>
    </Layout>

  );
}

