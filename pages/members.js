import Link from 'next/link';
import Layout from '../components/layout';
import { getMembersList } from '../lib/dataMembers';


export async function getStaticProps() {
  const allMembers = await getMembersList();
  return {
    props: { allMembers }
  };
}


export default function Home({ allMembers }) {
  
  return (
    <Layout home>
      <div className="home-container">
        <h1>Top Posts in Members</h1>
        <ul className="list-group">
          {allMembers.map(({ id, post_title }) => (
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