import { Route, Routes } from 'react-router'

import { Changelog, Contact, Error, LandingPage, NotFound, PrivacyPolicy } from '../pages'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
