import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton } from './ProjectsStyle'
import AwardCard from '../Cards/AwardCard'
import { awards } from '../../data/constants'
import AwardDetails from '../AwardDetails'


const Awards = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('award');
  return (
    <Container id="awards">
      <Wrapper>
        <Title>Awards & Recognition</Title>
        <Desc>
          Awards and recognition received for technical excellence, leadership, and outstanding contributions to enterprise projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'award' ?
            <ToggleButton active value="award" onClick={() => setToggle('award')}>AWARDS</ToggleButton>
            :
            <ToggleButton value="award" onClick={() => setToggle('award')}>AWARDS</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'award' && awards
            .map((award) => (
              <AwardCard award={award} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
        {openModal?.state &&
          <AwardDetails openModal={openModal} setOpenModal={setOpenModal} />
        }
      </Wrapper>
    </Container>
  )
}

export default Awards