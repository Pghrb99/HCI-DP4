import React from 'react'
import { Card, Typography } from 'antd';

const { Meta } = Card;

const CategoryCard = ({img, title, onClick}) => {
  const { Title } = Typography;

    return (
      <Card 
      className="CategoryCard"
      hoverable
      cover={<img alt={img.alt} src={img.src} />}
      onClick={() => onClick(title)}
    >
      <Meta title={<Title level={4}>{title}</Title>} style={{textAlign: "center"}}/>
    </Card>
    )
}

export default CategoryCard
