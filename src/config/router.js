import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import tweetRouter from '@/routes/tweet';
import associatedJobRouter from '@/routes/associatedJob';
import availableOfferRouter from '@/routes/availableOffer';
import claimOfferRouter from '@/routes/claimOffer';
import requestedOfferRouter from '@/routes/requestedOffer';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/tweets', tweetRouter);
  app.use('/associatedJobs', associatedJobRouter);
  app.use('/availableOffers', availableOfferRouter);
  app.use('/claimOffers', claimOfferRouter);
  app.use('/requestedOffers', requestedOfferRouter);
}
