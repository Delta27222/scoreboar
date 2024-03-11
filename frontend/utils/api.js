import axios from "axios";
import qs from "qs";


export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1383"
  }${path}`;
}

export function getApiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_APIAUTH_URL || "http://localhost:1383"
  }${path}`;
}

export async function getEndpoint() {
  const URLogin = getStrapiURL("/api/auth/local")   

    var response = await axios.post(URLogin, {
      identifier: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASS
    });
    const data_jwt = response.data.jwt;        



  return data_jwt;
}

export async function getAPIEndpoint() {
  const URLogin = getApiURL("/auth/local")   

    var response = await axios.post(URLogin, {
      identifier: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASS
    });
    const data_jwt = response.data.jwt;        



  return data_jwt;
}
/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, locale, limit, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetPages(
          $slug: String!
          $publicationState: PublicationState!
          $locale: I18NLocaleCode!
          
          
        ) {        
          pages(
            filters: { slug: { eq: $slug } }
            publicationState: $publicationState
            locale: $locale
                        
          ) {
            data {
              id
              attributes {
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                slug
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                contentSections {
                  __typename
                  ... on ComponentSectionsBottomActions {
                    id
                    title
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                  }
                  ... on ComponentSectionsHero {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    smallTextWithLink
                    slugSection
                    picture {
                      ...FileParts
                    }
                  }
                 
                  ... on ComponentSectionsFeatureColumnsGroup {
                    id
                    features {
                      id
                      description
                      icon {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsFeatureRowsGroup {
                    id
                    features {
                      id
                      description
                      link {
                        id
                        newTab
                        text
                        url
                      }
                      media {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsTestimonialsGroup {
                    id
                    description
                    link {
                      id
                      newTab
                      text
                      url
                    }
                    logos {
                      id
                      title
                      logo {
                        ...FileParts
                      }
                    }
                    testimonials {
                      id
                      logo {
                        ...FileParts
                      }
                      picture {
                        ...FileParts
                      }
                      text
                      authorName
                      authorTitle
                      link
                    }
                    title
                  }
                  ... on ComponentSectionsLargeVideo {
                    id
                    description
                    title
                    poster {
                      ...FileParts
                    }
                    video {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsRichText {
                    id
                    content
                  }
                  ... on ComponentSectionsPricing {
                    id
                    title
                    plans {
                      description
                      features {
                        id
                        name
                      }
                      id
                      isRecommended
                      name
                      price
                      pricePeriod
                    }
                  }
                  ... on ComponentSectionsLeadForm {
                    id
                    emailPlaceholder
                    location
                    submitButton {
                      id
                      text
                      type
                    }
                    title
                  }
                  ... on ComponentSectionsTrackPayment {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    picture {
                      ...FileParts
                    }
                  }                 
                  ... on ComponentSectionsCenterTitle {
                    id                    
                    location                    
                    title
                    
                  }
                  ... on ComponentSectionsRegistroform {
                    id
                    emailPlaceholder
                    location
                    submitButton {
                      id
                      text
                      type
                    }
                    title
                    titlepassw
                  }
                  ... on ComponentSectionsRegistrouser {
                    id
                    title
                    location
                    submitButton{
                      id
                      text
                      type
                    }
                    emailPlaceholder
                    passPlaceholder
                    passConPlaceholder
                  }
                  ... on ComponentSectionsRegistroInvercion {
                    id
                    title
                    location
                    submitButton{
                      id
                      text
                      type
                    }
                    phonePlaceholder
                    amountPlaceholder                    
                  }
                  ... on ComponentSectionsResetPassword {
                    id
                    title
                                    
                  }      
                  ... on ComponentSectionsForgotPassword {
                    id
                    title
                                    
                  }                                                    
                  ... on ComponentSectionsMercado  {
                    id                   
                    cotizacion (pagination: { page: ${limit}, pageSize: 10 }){
                      id
                      COD_SIMB
                      DESC_SIMB
                      VOL_CMP_1
                      PRE_CMP_1
                      PRE_VTA_1
                      VOL_VTA_1
                      CANT_NEGOC_DES
                    }                    
                  }
                  ... on ComponentSectionsMercadoRentaVariable  {
                    id                   
                    rentavariable (pagination: { page: ${limit}, pageSize: 30 }){
                      id
                      DESC_SIMB
                      COD_SIMB
                      PRECIO
                      VAR_ABS
                      VAR_REL
                      VOLUMEN
                      MONTO_EFECTIVO
                      HORA
                      ICON
                    }                    
                  }
                  ... on ComponentSectionsDashboard  {
                    id
                    title                   
                   
                         
                  }
                  ... on ComponentSectionsCardRegistro  {
                    id
                    title            
                    pagosnew {
                      id
                      date
                      cant
                      receiveamount
                      payment                    
                    }  
                    pagostrans {
                      id
                      date
                      cant
                      receiveamount
                      payment                        
                    }
                    pagospaid {
                      id
                      date
                      cant
                      receiveamount
                      payment                     
                    }
                    rpsaldo {
                      id
                      date
                      cant
                      receiveamount
                      payment                     
                    }        
                  }

                }
              }
            }
          }
         

        }       
      `,
      variables: {
        slug,
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
      },
    }),
  });

  const pagesData = await pagesRes.json();  
  // Make sure we found something, otherwise return null
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql");
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetGlobal($locale: I18NLocaleCode!) {
          global(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    url
                    newTab
                    text
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
              }
            }
          }
        }      
      `,
      variables: {
        locale,
      },
    }),
  });

  const global = await globalRes.json();
  //console.log(global.data.global);
  return global.data.global;
}


export async function getDashGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql");
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetDashglobal($locale: I18NLocaleCode!) {
          dashglobal(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    url
                    newTab
                    text
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
              }
            }
          }
        }      
      `,
      variables: {
        locale,
      },
    }),
  });

  const global = await globalRes.json();
  //console.log(global.data);
  return global.data.dashglobal;
}


export async function getOrdenes({ emails }) {
  // Find the pages that match this slug  
  const gqlEndpoint = getStrapiURL("/graphql");
  const data_jwt = await getEndpoint();
  
   
  const pagesRes = await fetch(gqlEndpoint, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetOrdenes(
        $emails: String!){  
  
        orders(
          sort:"id:desc" 
          filters:{email: { contains:$emails } }
          ){
         data{
          id
           attributes{
            cod_simb
            price
            amount
            Quantity
            operationtype 
            status  
           }
         }
        }  
       }
      `, variables: {
        emails
        
      },
     
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log('datos '+emails) 
  // Make sure we found something, otherwise return null
  if (pagesData.data?.orders == null || pagesData.data.orders.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getInfotransactions({ IdNumber, TransactionId }) {
  // Find the pages that match this slug  
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();
  
   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query Getinfotransactionsreceiveds(
        $IdNumber: String!
        $TransactionId: String!){  
  
          infotransactionsreceiveds(
          sort:"id:desc" 
          publicationState:PREVIEW
          where:{ MgiTransactionId_contains:$TransactionId, receiverIdNumber:$IdNumber }
          ){
          id
          loteid
          firstName
          lastName
          receiverIdNumber
          accountNumber
          receiveAmount
          StatusPaid
          controlStatus
        
        }  
       }
      `, variables: {
        IdNumber,
        TransactionId
        
      },
     
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds) 
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceiveds == null || pagesData.data.infotransactionsreceiveds.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data;
}


export async function getDayPaid({ ControlStatus, ValorStatus, FechaInicio, FechaFin }) {
  // Find the pages that match this slug  
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();
  
   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetinfotransactionsreceivedsConnection( 
        $ControlStatus: String!
        $ValorStatus: String!
        $FechaInicio: String!
        $FechaFin: String! ){

        infotransactionsreceivedsConnection(
        where:{ StatusPaid_eq:$ControlStatus, valor_contains:$ValorStatus, updated_at_gte:$FechaInicio, updated_at_lt:$FechaFin }
        ){
        groupBy {
          date {
            key:key
            connection {
              aggregate {
                count
                sum {
                  receiveAmount
                  payment
                  }
                }
              }
            }
          }
        }
      }
      `, variables: {
        ControlStatus,
        ValorStatus,
        FechaInicio,
        FechaFin
        
      },
     
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds) 
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceivedsConnection == null || pagesData.data.infotransactionsreceivedsConnection.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.infotransactionsreceivedsConnection.groupBy.date;
}


export async function getPaidday({ ControlStatus,  FechaInicio }) {
  // Find the pages that match this slug  
  const gqlEndpoint = getApiURL("/graphql");
  const data_jwt = await getAPIEndpoint();
  
   //console.log(data_jwt);
  const pagesRes = await fetch(gqlEndpoint, {    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer "+data_jwt
    },
    body: JSON.stringify({
      query: `
      query GetinfotransactionsreceivedsConnection( 
        $ControlStatus: String!    
        $FechaInicio: String! ){

        infotransactionsreceivedsConnection(
        where:{ StatusPaid_eq:$ControlStatus, updated_at_gte:$FechaInicio }
        ){
        groupBy {
          date {
            key:key
            connection {
              aggregate {
                count
                sum {
                  receiveAmount
                  payment
                  }
                }
              }
            }
          }
        }
      }
      `, variables: {
        ControlStatus,       
        FechaInicio,
       
        
      },
     
    }),
  });

  const pagesData = await pagesRes.json();
   //console.log(pagesData.data.infotransactionsreceiveds) 
  // Make sure we found something, otherwise return null
  if (pagesData.data?.infotransactionsreceivedsConnection == null || pagesData.data.infotransactionsreceivedsConnection.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.infotransactionsreceivedsConnection.groupBy.date;
}