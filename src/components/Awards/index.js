import React, { useState, useEffect } from 'react';
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton } from './ProjectsStyle';
import AwardCard from '../Cards/AwardCard';
import AwardDetails from '../AwardDetails';
import { readExcelData } from '../../utils/CommonUtils';
import { CommonConstant } from '../../utils/CommonConstant';
import { CircularProgress } from '@mui/material';

const Awards = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('award');
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readAwardsFromDrive = async () => {
      setLoading(true);
      try {
        const rows = await readExcelData(CommonConstant.EXCEL_URL, 'Awards');
        return transformAwards(rows);
      } catch (error) {
        console.error('Error reading awards from drive:', error);
        return [];
      }
    };

    const transformAwards = (rows) => {
      return rows.map(({ id, title, description, img, category, date, tags, pdf }) => ({
        id,
        title,
        description,
        img,
        category,
        date,
        tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [],
        pdf,
      }));
    };

    const fetchData = async () => {
      const awardsData = await readAwardsFromDrive();
      setAwards(awardsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container id="awards">
      <Wrapper>
        <Title>Awards & Recognition</Title>
        <Desc>
          Awards and recognition received for technical excellence, leadership, and outstanding contributions to enterprise projects.
        </Desc>
        <ToggleButtonGroup>
          {toggle === 'award' ? (
            <ToggleButton active value="award" onClick={() => setToggle('award')}>
              AWARDS
            </ToggleButton>
          ) : (
            <ToggleButton value="award" onClick={() => setToggle('award')}>
              AWARDS
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        {loading ? <CircularProgress /> :
          <CardContainer>
            {toggle === 'award' &&
              awards.map((award) => (
                <AwardCard key={award.id} award={award} openModal={openModal} setOpenModal={setOpenModal} />
              ))}
          </CardContainer>
        }
        {openModal?.state && <AwardDetails openModal={openModal} setOpenModal={setOpenModal} />}
      </Wrapper>
    </Container>
  );
};

export default Awards;