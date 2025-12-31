import React, { useState, useEffect } from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
} from './HeroStyle';
import HeroImg from '../../images/HeroImage.jpg';
import Typewriter from 'typewriter-effect';
import { readExcelData } from '../../utils/CommonUtils';
import { CommonConstant } from '../../utils/CommonConstant';
import { CircularProgress } from '@mui/material';

const HeroSection = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const transformBio = (bioRow) => {
      const defaultBio = {
        name: '',
        roles: [],
        description: '',
        github: '',
        resume:
          '',
        linkedin: '',
        insta: '',
        facebook: '',
      };

      if (!bioRow) {
        return defaultBio;
      }

      const roles = bioRow.roles
        ? bioRow.roles.split(',').map((role) => role.trim())
        : [];

      return {
        name: bioRow.name || defaultBio.name,
        roles: roles.length > 0 ? roles : defaultBio.roles,
        description: bioRow.description || defaultBio.description,
        github: bioRow.github || defaultBio.github,
        resume: bioRow.resume || defaultBio.resume,
        linkedin: bioRow.linkedin || defaultBio.linkedin,
        insta: bioRow.insta || defaultBio.insta,
        facebook: bioRow.facebook || defaultBio.facebook,
      };
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const rows = await readExcelData(CommonConstant.EXCEL_URL, 'Bio');
        const transformedData = transformBio(rows[0]);
        setBio(transformedData);
      } catch (error) {
        console.error('Error reading bio from drive:', error);
        setBio(transformBio(null));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !bio) {
    return (
      <div id="about" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I am <br /> {bio.name}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{bio.description}</SubTitle>
            <ResumeButton href={bio.resume} target="display">
              Check Resume
            </ResumeButton>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;