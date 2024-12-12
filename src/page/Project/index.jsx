import './index.css'
import { Row, Col, Card, Avatar } from 'antd'
const { Meta } = Card;
import { Link } from "react-router-dom"
import { getProject } from '../../api/project'
import { useEffect, useState } from 'react';
const Message = () => {
    const [projectList, setProjectList] = useState([])
    useEffect(() => {
        async function getProjectFn() {
            let res = await getProject()
            setProjectList(res)
        }
        getProjectFn()
    }, [])
    useEffect(() => {
        console.log('projectList updated:', projectList);
    }, [projectList]);
    return (
        <div className="project">
            <div className="project-title">
                <span className='title-h1'>我过去的项目冒险之旅。</span>
                <p>多年来，我一直在做各种各样的小项目，有<strong>开源</strong>的，有<strong>实验</strong>的，也有<strong> just for fun </strong>的，下面就是我筛选出来我觉得还不错的项目合集，也是我在技术领域中尝试和探索的最好见证。</p>
            </div>
            <div>
                <Row >
                    {projectList && projectList.map((item, index) => (
                        <div key={index}>
                            <Col span={8} style={{ marginTop: '20px', width: '100%', height: " 300px" }}>
                                <Card
                                    hoverable
                                    style={{
                                        width: "90%",
                                        height: "240px",
                                        minWidth: "300px",
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                    }} >
                                    <Avatar size={38} src={item.src} />
                                    <Link target="_blank" to={`${item.agreement}://${item.toLink}`} className='project-link'>
                                        <h3>{item.title}</h3>
                                        <div className='description'>
                                            <span>{item.description}</span>
                                        </div>
                                        <div>
                                            <span>技术栈:</span><span>{item.technology}</span>
                                        </div>
                                        <div>
                                            <span></span>
                                        </div>
                                        <Meta style={{ marginTop: "10px" }} title='' description={item.toLink} />
                                    </Link>
                                </Card>
                            </Col>
                        </div>
                    ))
                    }
                </Row>
            </div>
            <div style={{ height: '250px' }}></div>
        </div>
    )
}

export default Message