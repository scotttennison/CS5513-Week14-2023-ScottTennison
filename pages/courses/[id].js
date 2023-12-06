import Layout from '../../components/layout';
import { getCoursesIds, getCoursesData } from '../../lib/dataCourses';

export async function getStaticProps({ params }) {
  const itemCourses = await getCoursesData(params.id);

  return {
    props: {
      itemCourses
    }
  };
}

export async function getStaticPaths() {
  const data = await getCoursesIds(); 
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

export default function Entry({ itemCourses }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-header text-white">
          <h5 className="card-title">{itemCourses.post_title}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2"><strong>New Courses</strong> {itemCourses.meta_values}</h6>
          
        </div>
        <div className="card-footer bg-light">
        </div>
      </article>
    </Layout>

  );
}