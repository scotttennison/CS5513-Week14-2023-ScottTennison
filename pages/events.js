import Link from 'next/link';
import Layout from '../components/layout';
import { getEventsList } from '../lib/dataEvents';


export async function getStaticProps() {
  const allEvents = await getEventsList();
  return {
    props: { allEvents }
  };
}


export default function Home({ allEvents }) {
  
  return (
    <Layout home>
      <div className="home-container">
        <h1>Top Posts in Events</h1>
        <ul className="list-group">
          {allEvents.map(({ id, post_title }) => (
            <li key={id} className="list-group-item">
              <Link href={`/${id}`} className="list-group-link">
                {post_title}
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </Layout>
  );
}