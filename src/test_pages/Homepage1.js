import React, {useState, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../components/headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../images/customers-logo-strip.png";
import {PulseLoader} from "react-spinners";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-400 text-gray-100 hover:bg-primary-500`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ roundedHeaderButton }) => {

  const [address, setAddress] = useState('')

  const [updated, setUpdated] = useState(address)
  const [isUpdated, setIsUpdated] = useState(false)


  const [documentStatus, setDocumentStatus] = useState(0)

  const handleChange = (event) => {
    setAddress(event.target.value)
    setDocumentStatus(0)
  }

  const handleClick = () => {
    // 'address' stores input field value
    setUpdated(address)
    setIsUpdated(true)
  }


  const downloadFileAtURL=(url, fileName)=>{
    const aTag = document.createElement('a');
    aTag.href=url;
    aTag.setAttribute('download',fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }



  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (isUpdated) {
      setDocumentStatus(1)
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({address: address, document_status: documentStatus})
      };
      fetch('http://127.0.0.1:8000/items', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("Post Request Response:", data)
            setDocumentStatus(data)
          });
      setIsUpdated(false)
    }
// empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [isUpdated, updated]);




  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Simple Property Data <span tw="text-primary-500">for you.</span>
            </Heading>
            <Paragraph>
              Our templates are easy to setup, understand and customize. Fully modular components with a variety of
              pages and components.
            </Paragraph>
            <Actions>
              <input type="text"
                     placeholder="Enter Address"
                     id="address"
                     name="address"
                     onChange={handleChange}
                     value={address}/>
              {documentStatus === 0 ?
              (<button onClick={handleClick}>Get Started</button>) :
              documentStatus === 1 ?
              (<button><PulseLoader color="#fff" /></button>) :
              documentStatus === 2 ?
              <button
                onClick={() => {
                  downloadFileAtURL("http://127.0.0.1:8000/file", "API_Example")}}>
                  Document Ready
              </button> : ""}
            </Actions>
            <Paragraph>Current: {address}</Paragraph>
            <Paragraph>Updated: {updated}</Paragraph>
            <Paragraph>Document Status Code: {documentStatus}</Paragraph>
            <CustomersLogoStrip>
              <p>Our TRUSTED Customers</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
