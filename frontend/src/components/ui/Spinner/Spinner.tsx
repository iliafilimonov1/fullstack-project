import React from 'react';

const Spinner: React.FC = React.memo(() => (
  <div className="animate-spin h-10 w-10 border-2 rounded-full border-b-gray-400" />
));

Spinner.displayName = 'Spinner';

export default React.memo(Spinner);
