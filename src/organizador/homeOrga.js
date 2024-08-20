import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, message, Typography, Modal } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import EscenarioService from './ServiceDeleteScenary';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Title, Text } = Typography;
const { confirm } = Modal;

const OrganizerHome = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api-digitalevent.onrender.com/api/events/get/img`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleDelete = async (evento_id) => {
        try {
            const response = await fetch(`https://api-digitalevent.onrender.com/api/events/delete/img`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ evento_id })
            });

            if (response.ok) {
                setEvents(events.filter(event => event.evento_id !== evento_id));
                message.success('Evento eliminado exitosamente');

                // Aqui solo paso el id del evento eliminado para eliminar también el escenario del evento
                await EscenarioService.handleEscenarios(evento_id);
            } else {
                message.error('Error al eliminar el evento');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            message.error('Error al eliminar el evento');
        }
    };

    const showDeleteConfirm = (evento_id) => {
        confirm({
            title: '¿Estás seguro de que quieres eliminar este evento?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleDelete(evento_id);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleEdit = (evento_id) => {
        
        window.location.href = `dashboard/updateEvent/${evento_id}`;
    };

    const handleAdd = () => {
        navigate('/dashboard/formulario');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: es });
    };

    const renderEvents = (eventsList) => {
        return eventsList.map(event => (
            <Col span={7} key={event.evento_id} style={{ marginBottom: '16px' }}>
                <Card
                    hoverable
                    cover={<img alt="event" src={event.imagen_url} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />}
                    actions={[
                        event.estado === 'Pendiente' && (
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => handleEdit(event.evento_id)}
                                icon={<EditOutlined />}
                                style={{
                                    backgroundColor: '#4a148c',
                                    borderColor: '#4a148c',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexGrow: 1,
                                    width: '80%',
                                    margin: '0 auto'
                                }}
                            >
                                Editar
                            </Button>
                        ),
                        event.estado === 'Rechazado' && (
                            <Button
                                type="danger"
                                size="large"
                                onClick={() => showDeleteConfirm(event.evento_id)}
                                icon={<DeleteOutlined />}
                                style={{
                                    backgroundColor: '#f5222d',
                                    borderColor: '#f5222d',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexGrow: 1,
                                    width: '80%',
                                    margin: '0 auto'
                                }}
                            >
                                Eliminar
                            </Button>
                        ),

                    ]}
                    style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        borderColor: '#e0e0e0',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                    bodyStyle={{ padding: '16px' }}
                >
                    <Meta
                        title={<Title level={4} style={{ color: '#4a148c', marginBottom: 0 }}>{event.evento_nombre}</Title>}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <Text style={{ display: 'block', color: '#4a148c' }}>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            Fecha de inicio: {formatDate(event.fecha_inicio)}
                        </Text>
                        <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            Fecha de término: {formatDate(event.fecha_termino)}
                        </Text>
                        <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                            <ClockCircleOutlined style={{ marginRight: 8 }} />
                            Hora: {event.hora}
                        </Text>
                        <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                            <EnvironmentOutlined style={{ marginRight: 8 }} />
                            Ubicación: {event.ubicacion}
                        </Text>
                        <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                            <UserOutlined style={{ marginRight: 8 }} />
                            Máximo de personas: {event.max_per}
                        </Text>
                        <Text style={{ display: 'block', color: '#4a148c', marginTop: 4 }}>
                            <UserOutlined style={{ marginRight: 8 }} />
                            Costo del boleto: {event.monto} pesos MXN
                        </Text>
                    </div>
                </Card>
            </Col>
        ));
    };

    const approvedEvents = events.filter(event => event.estado === 'Aprobado');
    const pendingEvents = events.filter(event => event.estado === 'Pendiente');
    const rejectedEvents = events.filter(event => event.estado === 'Rechazado');

    return (
        <div style={{ padding: '20px', paddingLeft: '65px', paddingRight: '65px', height: '100vh', overflowY: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Title level={2}>Administrador de eventos:</Title>
            </div>
            <div style={{ height: '80vh', overflowY: 'auto' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card
                            title={<Title level={3} style={{ color: '#52c41a' }}>Eventos Aprobados</Title>}
                            bordered={false}
                            style={{
                                background: 'linear-gradient(135deg, #e0ffe0, #f6ffed)',
                                borderColor: '#b7eb8f',
                                borderRadius: '8px',
                                boxShadow: '0 6px 20px rgba(0, 128, 0, 0.2)'
                            }}
                            headStyle={{
                                borderBottom: '2px solid #52c41a',
                                paddingBottom: '12px',
                                fontWeight: 'bold',
                                color: '#52c41a'
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                {renderEvents(approvedEvents)}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24} style={{ marginTop: '16px' }}>
                        <Card
                            title={<Title level={3} style={{ color: '#faad14' }}>Eventos Pendientes</Title>}
                            bordered={false}
                            style={{
                                background: 'linear-gradient(135deg, #fff3e0, #fff7e6)',
                                borderColor: '#ffe7ba',
                                borderRadius: '8px',
                                boxShadow: '0 6px 20px rgba(255, 165, 0, 0.2)'
                            }}
                            headStyle={{
                                borderBottom: '2px solid #faad14',
                                paddingBottom: '12px',
                                fontWeight: 'bold',
                                color: '#faad14'
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                {renderEvents(pendingEvents)}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24} style={{ marginTop: '16px' }}>
                        <Card
                            title={<Title level={3} style={{ color: '#f5222d' }}>Eventos Rechazados</Title>}
                            bordered={false}
                            style={{
                                background: 'linear-gradient(135deg, #ffe0e0, #fff1f0)',
                                borderColor: '#ffa39e',
                                borderRadius: '8px',
                                boxShadow: '0 6px 20px rgba(255, 0, 0, 0.2)'
                            }}
                            headStyle={{
                                borderBottom: '2px solid #f5222d',
                                paddingBottom: '12px',
                                fontWeight: 'bold',
                                color: '#f5222d'
                            }}
                        >
                            <Row gutter={[16, 16]}>
                                {renderEvents(rejectedEvents)}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                onClick={handleAdd}
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '50px',
                    backgroundColor: '#4a148c',
                    borderColor: '#4a148c',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    width: '60px',
                }}
            />
        </div>
    );
};

export default OrganizerHome;
