import Layout from '../components/layout';
import { getEventsIds, getEventsData } from '../lib/dataEvents';
import { getCoursesIds, getCoursesData } from '../lib/dataCourses';
import { getMembersIds, getMembersData } from '../lib/dataMembers';

// Unified getStaticPaths
export async function getStaticPaths() {
    const eventsData = await getEventsIds();
    const coursesData = await getCoursesIds();
    const membersData = await getMembersIds();

    const paths = [...eventsData, ...coursesData, ...membersData]
        .filter(item => item?.id != null)
        .map(item => ({
            params: { id: item.id }
        }));

    return { paths, fallback: false };
}

// Unified getStaticProps
export async function getStaticProps({ params }) {
    let itemData;
    let type;

    // Define the specific IDs for each type
    const memberIds = ['173', '175'];
    const eventIds = ['172', '176'];
    const courseIds = ['145', '177'];

    if (memberIds.includes(params.id)) {
        // Fetch member data if ID matches member IDs
        itemData = await getMembersData(params.id);
        type = 'member';
    } else if (eventIds.includes(params.id)) {
        // Fetch event data if ID matches event IDs
        itemData = await getEventsData(params.id);
        type = 'event';
    } else if (courseIds.includes(params.id)) {
        // Fetch course data if ID matches course IDs
        itemData = await getCoursesData(params.id);
        type = 'course';
    } else {
        return { notFound: true };
    }
    

    return {
        props: { itemData, type },
        revalidate: 60
    };
}


// Unified component
export default function Entry({ itemData, type }) {
    return (
        <Layout>
            <article className="card col-6">
                <div className="card-header text-white">
                    <h5 className="card-title">{itemData.post_title}</h5>
                </div>
                <div className="card-body">
                    {type === 'event' && (
                        <>
                        <h6 className="card-subtitle mb-2"><strong>New Events</strong></h6> 
                        <ul>
                        {itemData.meta_values.split(', ').map((metaValue, index) => (
                            <li key={index}>{metaValue}</li>
                        ))}
                    </ul>
                    </>
                        
                    )}
                    {type === 'course' && (
                        <>
                        <h6 className="card-subtitle mb-2"><strong>New Courses</strong></h6>
                        <ul>
                                {itemData.meta_values.split(', ').map((metaValue, index) => (
                                    <li key={index}>{metaValue}</li>
                                ))}
                            </ul>
                            </>
                    )}
                    {type === 'member' && (
                        <>
                            <h6 className="card-subtitle mb-2"><strong>New Members</strong></h6>
                            <ul>
                                {itemData.meta_values.split(', ').map((metaValue, index) => (
                                    <li key={index}>{metaValue}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="card-footer bg-light">
                </div>
            </article>
        </Layout>
    );
}
