import flowContent from './flowContent';
import embededContent from './embededContent';
import headingContent from './heading';
import interactiveContent from './interactiveContent';
import phrasingContent from './phrasingContent';
import sectionContent from './sectioningContent';
import { type } from 'os';

export default {
  flowContent,
  embededContent,
  headingContent,
  interactiveContent,
  phrasingContent,
  sectionContent
}

export const isFunctionalType = (type) => {
  return embededContent.hasOwnProperty(type) 
  || headingContent.hasOwnProperty(type)
  || interactiveContent.hasOwnProperty(type)
}

export const isHeadingType = () => {
  return headingContent.hasOwnProperty(type);
}

export const isInteractiveType = () => {
  return interactiveContent.hasOwnProperty(type);
}


export const isPhrasingType = (type) => {
  return isFunctionalType(type) && phrasingContent.hasOwnProperty(type)
}