import { GetStaticProps} from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product } : HomeProps) {
  

  return (
    <>
    <Head>
        <title>Home | ig.news</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 emoji Hey, welcome</span>
        <h1>News about the <span>React</span> word.</h1>
        <p>
          Get acess to ali the publications <br />
          <span>for {product.amount} mouth</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>
    
      <img src="/images/avatar.svg" alt="Girl coding"/>
    </main>
    </>
  )
}
//export const getServerSideProps = ({ req }) => {}
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IejIxABqF8LxqJ80rhq6N4T')

 // const price = await stripe.prices.retrieve('price_1IejIxABqF8LxqJ80rhq6N4T', {
   // expand: ['product'] // o expand para pegar o restante da informações do product caso precise
  //})

const product = {
  priceId: price.id,
  amount: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price.unit_amount / 100),
}

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 horas
  }
}