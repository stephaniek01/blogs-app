import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBlog } from '../../redux/actions';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

const BlogShow = ({ blogs, fetchBlog }) => {
  const { _id } = useParams();
  const { title, content } = blogs[_id];

  useEffect(() => {
    fetchBlog(_id);
  }, [fetchBlog, _id]);

  return (
    blogs[_id] && (
      <Card>
        <CardHeader>
          <Heading size='lg'>{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{content}</Text>
        </CardBody>
      </Card>
    )
  );
};

function mapStateToProps({ blogs }, ownProps) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
