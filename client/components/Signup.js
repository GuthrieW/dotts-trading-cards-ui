import Head from 'next/head'

export default class App extends React.Component {

    handleChange(changeEvent) {}

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
                        <h1>Signup Page</h1>
                    </div>
                </main>
            </>
        )
    }
}