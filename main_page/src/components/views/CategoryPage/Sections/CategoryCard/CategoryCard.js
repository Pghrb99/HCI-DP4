import React from 'react'
import { Card, Typography } from 'antd';

const { Meta } = Card;

const CategoryCard = ({img, title}) => {
  const { Title } = Typography;

    return (
      <Card 
      className="CategoryCard"
      hoverable
      style={{ width: 300 }}
      cover={<img alt={img.alt} src={img.src} />}
    >
      <Meta title={<Title level={4}>{title}</Title>} style={{textAlign: "center"}}/>
    </Card>
    )
}

export default CategoryCard
