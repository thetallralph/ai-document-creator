import { ObjectTemplate } from '../../types/objectTemplate';

const simpleFlyer: ObjectTemplate = {
  id: 'simple-flyer',
  name: 'Simple Flyer',
  description: 'A4 single-page promotional flyer with object literal format',
  render: () => ({
    type: 'Document',
    props: {
      title: 'Simple Flyer',
      paperSize: 'A4'
    },
    children: [{
      type: 'Page',
      props: {
        background: '#ffffff',
        style: {
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              textAlign: 'center',
              marginBottom: '40px'
            }
          },
          children: [
            {
              type: 'h1',
              props: {
                style: {
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '10px'
                }
              },
              children: ['Big Summer Sale!']
            },
            {
              type: 'p',
              props: {
                style: {
                  fontSize: '24px',
                  color: '#666'
                }
              },
              children: ['Up to 50% off on selected items']
            }
          ]
        },
        {
          type: 'div',
          props: {
            style: {
              backgroundColor: '#f0f0f0',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center'
            }
          },
          children: [
            {
              type: 'h2',
              props: {
                style: {
                  fontSize: '32px',
                  color: '#333',
                  marginBottom: '20px'
                }
              },
              children: ['Featured Products']
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginTop: '20px'
                }
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  },
                  children: [
                    {
                      type: 'h3',
                      props: {
                        style: { fontSize: '18px', marginBottom: '10px' }
                      },
                      children: ['Product 1']
                    },
                    {
                      type: 'p',
                      props: {
                        style: { fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }
                      },
                      children: ['$29.99']
                    }
                  ]
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  },
                  children: [
                    {
                      type: 'h3',
                      props: {
                        style: { fontSize: '18px', marginBottom: '10px' }
                      },
                      children: ['Product 2']
                    },
                    {
                      type: 'p',
                      props: {
                        style: { fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }
                      },
                      children: ['$49.99']
                    }
                  ]
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  },
                  children: [
                    {
                      type: 'h3',
                      props: {
                        style: { fontSize: '18px', marginBottom: '10px' }
                      },
                      children: ['Product 3']
                    },
                    {
                      type: 'p',
                      props: {
                        style: { fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }
                      },
                      children: ['$39.99']
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'div',
          props: {
            style: {
              textAlign: 'center',
              marginTop: '40px',
              padding: '20px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '10px'
            }
          },
          children: [
            {
              type: 'h3',
              props: {
                style: { fontSize: '24px', marginBottom: '10px' }
              },
              children: ['Visit us today!']
            },
            {
              type: 'p',
              props: {
                style: { fontSize: '16px', opacity: 0.9 }
              },
              children: ['123 Main Street, City | Open Mon-Sat 9AM-8PM']
            }
          ]
        }
      ]
    }]
  })
};

export default simpleFlyer;