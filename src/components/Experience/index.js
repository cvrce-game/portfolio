
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import * as XLSX from 'xlsx';
import { calculateFromString } from '../../data/constants';

const EXCEL_URL = `https://docs.google.com/spreadsheets/d/1aA6CSyPmdR4Qwn1wgyCRJR6oFIbZ0Mip/export?format=xlsx`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 80px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const readExperiencesFromDrive = async () => {
            try {
                const res = await fetch(EXCEL_URL);
                const buffer = await res.arrayBuffer();

                const workbook = XLSX.read(buffer, { type: 'array' });
                const sheetName = 'Experience';
                const sheet = workbook.Sheets[sheetName];

                let rows;
                if (!sheet) {
                    console.error(`Sheet "${sheetName}" not found. Falling back to the first sheet.`);
                    const firstSheetName = workbook.SheetNames[0];
                    rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
                } else {
                    rows = XLSX.utils.sheet_to_json(sheet);
                }
                
                const formattedExperiences = rows.map(row => {
                    const date = row.date;
                    let formattedDate = date;
                    if (date && date.includes('Present')) {
                        const startDate = date.split(' - ')[0];
                        formattedDate = `${date} · ${calculateFromString(startDate)}`;
                    }

                    return {
                        ...row,
                        date: formattedDate,
                        skills: row.skills ? row.skills.split('\n').map(skill => skill.trim()) : []
                    };
                });

                setExperiences(formattedExperiences);
            } catch (error) {
                console.error('Error reading experiences from drive:', error);
            }
        };

        readExperiencesFromDrive();
    }, []);

    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <Desc>
                    My work experience as a software engineer and working on different companies and projects.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((experience,index) => (
                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="secondary" />
                                    {index !== experiences.length - 1 && <TimelineConnector style={{ background: '#854CE6' }} />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <ExperienceCard experience={experience}/>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>

                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default Experience;
