import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Typography, Modal } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
const { Meta } = Card;
const { Title, Text } = Typography;

const Pendientes = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
      fetch(`https://api-digitalevent.onrender.com/api/events/get/pending`)
          .then(response => response.json())
          .then(data => setEvents(data))
          .catch(error => console.error('Error fetching events:', error));
  }, []);

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: es });
  };

  const handleInspect = (event) => {
      setSelectedEvent(event);
      setIsModalVisible(true);
  };

  const handleUpdateStatus = async (evento_id, estado) => {
      try {
          const response = await fetch(`https://api-digitalevent.onrender.com/api/events/post/pending`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ evento_id, estado }),
          });

          if (!response.ok) {
              throw new Error('Error al actualizar el estado del evento');
          }

          setEvents(events.filter(event => event.evento_id !== evento_id));
          setIsModalVisible(false);
      } catch (error) {
          console.error('Error al actualizar el estado del evento:', error);
      }
  };

  const showModal = (evento_id, estado, evento_nombre) => {
      setModalContent({ evento_id, estado, evento_nombre });
      setIsModalVisible(true);
  };

  const handleOk = () => {
      if (selectedEvent) {
          setIsModalVisible(false);
          setSelectedEvent(null);
      } else {
          handleUpdateStatus(modalContent.evento_id, modalContent.estado);
      }
  };

  const handleCancel = () => {
      setIsModalVisible(false);
      setSelectedEvent(null);
  };

  const renderEvents = (eventsList) => {
      if (eventsList.length === 0) {
          return <Text style={{ textAlign: 'center', width: '100%' }}>No hay eventos para mostrar</Text>;
      }

      return eventsList.map(event => (
          <Col span={24} key={event.evento_id} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Card
                  hoverable
                  style={{
                      display: 'flex',
                      flexDirection: 'row',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      borderColor: '#d3d3d3',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                      width: '720px',
                      height: '300px',
                  }}
                  bodyStyle={{ display: 'flex', padding: '0' }}
              >
                  <img
                      alt="event"
                      src={event.imagen_url}
                      style={{ width: '320px', height: '100%', objectFit: 'cover', borderRadius: '12px 0 0 12px' }}
                  />
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                          <Meta
                              title={<Title level={4} style={{ color: '#3e4a61', marginBottom: '10px' }}>{event.evento_nombre}</Title>}
                          />
                          <div style={{ marginTop: '10px' }}>
                              <Text style={{ display: 'block', color: '#3e4a61' }}>
                                  <CalendarOutlined style={{ marginRight: 8 }} />
                                  Fecha de inicio: {formatDate(event.fecha_inicio)}
                              </Text>
                              <Text style={{ display: 'block', color: '#3e4a61', marginTop: 4 }}>
                                  <CalendarOutlined style={{ marginRight: 8 }} />
                                  Fecha de término: {formatDate(event.fecha_termino)}
                              </Text>
                              <Text style={{ display: 'block', color: '#3e4a61', marginTop: 4 }}>
                                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                                  Hora: {event.hora}
                              </Text>
                              <Text style={{ display: 'block', color: '#3e4a61', marginTop: 4 }}>
                                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                                  Ubicación: {event.ubicacion}
                              </Text>
                              <Text style={{ display: 'block', color: '#3e4a61', marginTop: 4 }}>
                                  <UserOutlined style={{ marginRight: 8 }} />
                                  Máximo de personas: {event.max_per}
                              </Text>
                          </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                          <Button
                              type="primary"
                              onClick={() => handleInspect(event)}
                              style={{
                                  backgroundColor: '#005f73',
                                  borderColor: '#005f73',
                                  color: '#fff',
                                  borderRadius: '8px',
                                  flex: 1,
                                  marginRight: '8px'
                              }}
                          >
                              Inspeccionar
                          </Button>
                          <Button
                              type="primary"
                              onClick={() => showModal(event.evento_id, 'Aprobado', event.evento_nombre)}
                              style={{
                                  backgroundColor: '#0b2268',
                                  borderColor: '#0b2268',
                                  color: '#fff',
                                  borderRadius: '8px',
                                  flex: 1,
                                  marginRight: '8px'
                              }}
                          >
                              Aprobar
                          </Button>
                          <Button
                              type="danger"
                              onClick={() => showModal(event.evento_id, 'Rechazado', event.evento_nombre)}
                              style={{
                                  backgroundColor: '#81171b',
                                  borderColor: '#81171b',
                                  color: '#fff',
                                  borderRadius: '8px',
                                  flex: 1
                              }}
                          >
                              Rechazar
                          </Button>
                      </div>
                  </div>
              </Card>
          </Col>
      ));
  };

  return (
      <div>
          <div style={{ padding: '20px', paddingLeft: '65px', paddingRight: '65px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Title level={2} style={{ color: '#333', fontWeight: 'bold' }}>Administrador de eventos:</Title>
              </div>
              <div style={{ maxHeight: '500px', overflow: 'auto', paddingRight: '16px' }}>
                  <Row gutter={[16, 16]}>
                      {renderEvents(events)}
                  </Row>
              </div>
          </div>
          <Modal
              title={selectedEvent ? <Title level={3} style={{ color: '#333' }}>{selectedEvent.evento_nombre}</Title> : `¿Estás seguro de que quieres ${modalContent.estado?.toLowerCase()} el evento?`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={selectedEvent ? "Cerrar" : "Confirmar"}
              cancelButtonProps={{ style: { display: selectedEvent ? 'none' : 'inline-block' } }}
              centered
              bodyStyle={{
                  display: 'flex',
                  flexDirection: selectedEvent ? 'row' : 'column',
                  alignItems: selectedEvent ? 'center' : 'flex-start',
                  gap: '20px',
                  padding: selectedEvent ? '20px' : '0',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '12px',
              }}
              width={850}
          >
              {selectedEvent ? (
                  <div style={{ display: 'flex', width: '90%' }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                          <img
                              alt="event"
                              src={selectedEvent.imagen_url}
                              style={{ width: '300px', height: '300px', borderRadius: '8px' }}
                          />
                      </div>
                      <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'left' }}>
                          <Text style={{ display: 'block', color: '#4a148c', fontWeight: 'bold' }}>
                              Fecha de inicio:
                          </Text>
                          <Text style={{ display: 'block', marginBottom: '10px' }}>
                              {formatDate(selectedEvent.fecha_inicio)}
                          </Text>
                          <Text style={{ display: 'block', color: '#4a148c', fontWeight: 'bold' }}>
                              Fecha de término:
                          </Text>
                          <Text style={{ display: 'block', marginBottom: '10px' }}>
                              {formatDate(selectedEvent.fecha_termino)}
                          </Text>
                          <Text style={{ display: 'block', color: '#4a148c', fontWeight: 'bold' }}>
                              Hora:
                          </Text>
                          <Text style={{ display: 'block', marginBottom: '10px' }}>
                              {selectedEvent.hora}
                          </Text>
                          <Text style={{ display: 'block', color: '#4a148c', fontWeight: 'bold' }}>
                              Ubicación:
                          </Text>
                          <Text style={{ display: 'block', marginBottom: '10px' }}>
                              {selectedEvent.ubicacion}
                          </Text>
                          <Text style={{ display: 'block', color: '#4a148c', fontWeight: 'bold' }}>
                              Máximo de personas:
                          </Text>
                          <Text style={{ display: 'block', marginBottom: '10px' }}>
                              {selectedEvent.max_per}
                          </Text>
                      </div>
                  </div>
              ) : (
                  <>
                      <Text style={{ marginBottom: '20px' }}>
                          {modalContent.estado === 'Aprobado'
                              ? `¿Estás seguro de que quieres aprobar el evento ${modalContent.evento_nombre}?`
                              : `¿Estás seguro de que quieres rechazar el evento ${modalContent.evento_nombre}?`}
                      </Text>
                  </>
              )}
          </Modal>
      </div>
  );
};

export default Pendientes;
