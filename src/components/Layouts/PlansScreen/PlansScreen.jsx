import './PlansScreen.css'
import React, {useEffect, useState} from 'react'
import db from '../../../firebase'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/userSlice'
import {loadStripe} from '@stripe/stripe-js'

function PlansScreen() {

    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    })
                })
            })
    }, [user.uid])

    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                const products = {}
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data()
                    const priceSnap = await productDoc.ref.collection('prices').get()
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                    setProducts(products)
                })
            })
            .catch(error => console.log(error.message))
    }, [])

    console.log(products)
    console.log(subscription)

    const loadCheckOut = async (priceId) => {
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            })

        docRef.onSnapshot(async (snap) => {
            const {error, sessionId} = snap.data()

            if (error) {
                // Show an error to customer and inspect the cloud  function logs in the firebase console
                console.log(`error occured: ${error.message}`)
            }

            if (sessionId) {
                // We have a session, let's redirect to Checkout 
                // Init Stripe
                const stripe = await loadStripe("pk_test_51J5rRIKM1pag91uXGmrnwDlnui4n25TvrbatpxYCFk8Vtq1Io1H8Io1JNKAoLkomZXsZDrMm7csTjiVoDkze6G1M00wxonA9Cu")
                stripe.redirectToCheckout({sessionId})
            }
        })
    }

    return (
        <div className="PlansScreen">
            <div className="col-12">
                <b>Planes <span className="PlansScreen__role">Plan actual:  {subscription?.role}</span></b>
                <hr />
                <p><b>Renewal date</b> {subscription?.current_period_end}</p>
                <hr />
            </div>
            <div className="col-12">
                {Object.entries(products).map(([productId, productData]) => {

                    const isCurrentPlan = productData.name?.toLowerCase().includes(subscription?.role)

                    return (
                        <div className="PlansScreen__plan row justify-content-between" key={productId}>
                            <div className="col-6">{productData.name} <small>{productData.description}</small></div>
                            <button className={`${isCurrentPlan && 'PlansScreen__disabled'} PlansScreen__button col-4`} onClick={() => !isCurrentPlan && loadCheckOut(productData.prices.priceId)}>
                                {isCurrentPlan ? 'Plan actual' : 'Seleccionar plan'}
                            </button>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default PlansScreen