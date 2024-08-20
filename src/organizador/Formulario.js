import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Form, Button, Card, Select, Input, DatePicker, TimePicker, InputNumber, Row, Col, Modal, Radio } from 'antd';
import '../styles/formulario.css';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Formulario = () => {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [customImageUrl, setCustomImageUrl] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);

    const handleImageSelection = (e) => {
        setSelectedImage(e.target.value);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        const maxPer = values.max_per;
        const formaEscenario = values.escenario;

        let imagen_url = selectedImage;
        if (selectedImage === 'custom') {
            imagen_url = customImageUrl;
        }

        const formattedValues = {
            nombre: values.nombre,
            fecha_inicio: values.fecha_inicio.format('YYYY-MM-DD'),
            fecha_termino: values.fecha_termino.format('YYYY-MM-DD'),
            hora: values.hora.format('HH:mm'),
            tipo_evento_id: values.tipo_evento_id,
            categoria_id: values.categoria_id,
            ubicacion: values.ubicacion,
            max_per: values.max_per,
            imagen_url: imagen_url,
            monto: values.monto,
            descripcion: values.descripcion,
        };

        try {
            const response = await fetch(`https://api-digitalevent.onrender.com/api/events/post/img`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedValues),
            });

            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

            if (response.ok) {
                const evento_id = data.evento_id;

                const escenarioResponse = await fetch(`https://api-digitalevent.onrender.com/api/escenarios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        asiento: maxPer,
                        forma: formaEscenario,
                        evento_id: evento_id,
                    }),
                });
                const escenarioData = await escenarioResponse.json();

                if (escenarioResponse.ok) {
                    Swal.fire('Éxito', 'El evento y el escenario se han creado correctamente.', 'success');
                    window.location.href = '/dashboard';
                } else {
                    throw new Error(escenarioData.message || 'Error al crear el escenario');
                }
            } else {
                throw new Error(data.message || data || 'Error al crear el evento');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            Swal.fire('Error', error.message || 'Ocurrió un error al enviar los datos.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <Card>
                    <br></br>
                    <h1 className="text-Organizador">Crear Evento</h1>
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label={<strong>Nombre</strong>} name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre del evento' }]}>
                                    <Input className="input-field" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Ubicación</strong>} name="ubicacion" rules={[{ required: true, message: 'Por favor ingrese la ubicación' }]}>
                                    <Input className="input-field" />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label={<strong>Fecha de Inicio</strong>} name="fecha_inicio" rules={[{ required: true, message: 'Por favor seleccione la fecha de inicio' }]}>
                                    <DatePicker className="input-field" style={{ width: '100%' }} />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Fecha de Término</strong>} name="fecha_termino" rules={[{ required: true, message: 'Por favor seleccione la fecha de término' }]}>
                                    <DatePicker className="input-field" style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label={<strong>Hora</strong>} name="hora" rules={[{ required: true, message: 'Por favor seleccione la hora' }]}>
                                    <TimePicker className="input-field" style={{ width: '100%' }} format="HH:mm" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Máximo de personas</strong>} name="max_per" rules={[{ required: true, message: 'Por favor ingrese el número máximo de personas' }]}>
                                    <InputNumber min={1} className="input-field" style={{ width: '100%' }} />
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label={<strong>Tipo de Evento</strong>} name="tipo_evento_id" rules={[{ required: true, message: 'Por favor seleccione el tipo de evento' }]}>
                                    <Select placeholder="Seleccionar tipo de evento" className="input-field">
                                        <Option value={1}>Público</Option>
                                        <Option value={2}>Privado</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Categoría</strong>} name="categoria_id" rules={[{ required: true, message: 'Por favor seleccione la categoría' }]}>
                                    <Select placeholder="Seleccionar categoría" className="input-field">
                                        <Option value={1}>Tecnología</Option>
                                        <Option value={2}>Educación</Option>
                                        <Option value={3}>Entretenimiento</Option>
                                        <Option value={4}>Deportes</Option>
                                    </Select>
                                </Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Item label={<strong>Escenario</strong>} name="escenario" rules={[{ required: true, message: 'Por favor seleccione un tipo de escenario' }]}>
                                    <Select className="input-field">
                                        <Option value={'Redondo'}>Redondo</Option>
                                        <Option value={'Cuadrado'}>Cuadrado</Option>
                                        <Option value={'Triangular'}>Triangular</Option>
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Monto</strong>} name="monto" rules={[{ required: true, message: 'Por favor ingrese el monto' }]}>
                                    <InputNumber min={0} addonBefore="MXN" className="input-field" style={{ width: '100%' }} />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item label={<strong>Imagen</strong>} rules={[{ required: true, message: 'Por favor seleccione una imagen' }]}>
                                    <Button onClick={() => setImageModalVisible(true)}>Seleccionar Imagen</Button>
                                </Item>
                            </Col>
                        </Row>
                        <Item label={<strong>Descripción</strong>} name="descripcion" rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}>
                            <TextArea className="input-field" rows={4} />
                        </Item>
                        <Item className="form-buttons">
                            <Button type="primary" htmlType="submit" loading={loading} className="submit-button">
                                Crear Evento
                            </Button>
                            <Button type="button" onClick={() => window.history.back()} className="cancel-button">
                                Cancelar
                            </Button>
                        </Item>
                    </Form>
                </Card>
            </div>
            <Modal
                title="Seleccionar Imagen"
                visible={imageModalVisible}
                onOk={() => setImageModalVisible(false)}
                onCancel={() => setImageModalVisible(false)}
            >
                <Radio.Group onChange={handleImageSelection} value={selectedImage}>
                    <Radio value="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">Tecnología</Radio>
                    <Radio value="https://images.pexels.com/photos/1181265/pexels-photo-1181265.jpeg?auto=compress&cs=tinysrgb&w=600">Educación</Radio>
                    <Radio value="https://images.pexels.com/photos/1203409/pexels-photo-1203409.jpeg?auto=compress&cs=tinysrgb&w=600">Deportes</Radio>
                    <Radio value="custom">Subir Imagen Personalizada</Radio>
                </Radio.Group>
                {selectedImage === 'custom' && (
                    <Input
                        placeholder="Ingrese URL de la imagen personalizada"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        style={{ marginTop: '16px' }}
                    />
                )}
                {selectedImage && selectedImage !== 'custom' && (
                    <img src={selectedImage} alt="Seleccionada" style={{ marginTop: '16px', maxWidth: '100%' }} />
                )}
            </Modal>
        </div>
    );
};

export default Formulario;
