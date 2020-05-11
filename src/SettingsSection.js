import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Divider } from '@material-ui/core';

const SettingsSectionWrapper = styled.div`
  padding: 16px;
`;

const Title = styled(Typography)`
  margin-bottom: 8px;
`;

export default function SettingsSection({ title, children }) {
  return (
    <>
      <SettingsSectionWrapper>
        <Title variant="subtitle2">{title}</Title>

        {children}
      </SettingsSectionWrapper>
      <Divider />
    </>
  );
}

SettingsSection.propTypes = {
  title: PropTypes.string.isRequired,
};
