import Head from 'next/head'
import React, { useState } from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Label,
    FormGroup,
    Input,
    Button,
} from 'reactstrap'

const IMAGE_URL_REGEX = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g;
const CARD_WIDTH = 500;
const CARD_HEIGHT = 200;

function isValidImageUrl(imageUrl) {
    return (imageUrl.match(IMAGE_URL_REGEX) != null);
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl: null,
            displayImage: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(changeEvent) {
        const newUrl = changeEvent.target.value;
        this.setState({
            imageUrl: newUrl
        });
        this.setState({
            displayImage: isValidImageUrl(newUrl)
        });
        return;
    }

    render() {
        return (
            <>
                <Head>
                    <title>Create Next App</title>
                    <link rel='icon' href='/favicon.ico' />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </Head>
                <main>
                    <div className='container'>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Label>Player Name</Label>
                                        <Input placeholder='Player Name'/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Player Team</Label>
                                        <Input placeholder='Player Team'/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Card Image URL</Label>
                                        <Input
                                            type='text'
                                            name='card-image-url'
                                            placeholder='Card Image URL'
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </Col>
                            <Col>
                                <Container>
                                    {this.state.displayImage && (
                                        <img src={this.state.imageUrl} width={CARD_WIDTH} height={CARD_HEIGHT}/>
                                    )}
                                </Container>
                            </Col>
                        </Row>
                    </div>
                </main>
            </>
        )
    }
}