import Link from 'next/link';
import Layout from '../components/layout';
import { getCoursesList } from '../lib/dataCourses';


export async function getStaticProps() {
  const allCourses = await getCoursesList();
  return {
    props: { allCourses }
  };
}


export default function Home({ allCourses }) {
  
  return (
    <Layout home>
      <div className="home-container">
        <h1>Top Posts in Courses</h1>
        <ul className="list-group">
          {allCourses.map(({ id, post_title }) => (
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