import React, {useState} from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const CategoryCard = ({img, title}) => {
    return (
      <Card 
      className="CategoryCard"
      hoverable
      style={{ width: 300 }}
      cover={<img alt={img.alt} src={img.src} />}
    >
      <Meta title={title} style={{textAlign: "center"}}/>
    </Card>
    )
}

export default CategoryCard
