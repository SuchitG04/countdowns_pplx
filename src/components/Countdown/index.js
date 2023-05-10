import { useState } from 'react';
import { useCountdown } from './useCountdown';
import TimezoneSelect from 'react-timezone-select';
import Select from 'react-select';

const DECIMAL_PLACES = 6;

export function Countdown() {
  const {
    days,
    date,
    desc,
    timezone,
    handleDateChange,
    handleDescChange,
    handleTimezoneChange,
    countdownStyle,
    toggleCountdownStyle,
  } = useCountdown();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (days === null) {
    return null;
  }

  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(DECIMAL_PLACES);

  const traditionalCountdown = () => {
    const hours = Math.floor((days % 1) * 24);
    const minutes = Math.floor((((days % 1) * 24) % 1) * 60);
    const seconds = Math.round(((((days % 1) * 24) % 1) * 60) % 1 * 60);
    return (
      <>
        <span className="text-4xl md:text-6xl">{integerDays}d </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-4 text-neutral-200 text-opacity-75">{hours}h </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75">{minutes}m </span>
        <span className="text-2xl md:text-4xl -ml-3 md:-ml-0 text-neutral-200 text-opacity-75">{seconds}s</span>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/static/img/bg.png')" }}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="block text-white text-xl font-apple2mono focus:outline-none relative transform transition-transform md:duration-200 md:hover:scale-105"
        >
          <span className="inline-block py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-emerald-500 shadow-md transition-all duration-300 ease-in-out hover:from-emerald-500 hover:to-teal-500">
            settings
          </span>
        </button>

      </div>
      <div className={`absolute w-2/3 md:w-fit top-16 right-4 md:right-4 backdrop-filter backdrop-blur-lg p-4 mt-2 rounded ${isSettingsOpen ? '' : 'hidden'}`}>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono">
          date
          <input type="date" value={date} onChange={handleDateChange} className="mt-1 ml-4 md:ml-0 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          description
          <input type="text" value={desc} onChange={handleDescChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          timezone
          <TimezoneSelect
            className="text-black"
            value={timezone}
            onChange={handleTimezoneChange}
          />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          style
          <Select
            placeholder="select a style"
            defaultValue={{ value: 'fractional', label: 'fractional' }}
            onChange={toggleCountdownStyle}
            className="mt-1 w-full rounded text-black font-apple2mono"
            options={[
              { value: 'fractional', label: 'fractional' },
              { value: 'traditional', label: 'traditional' },
            ]}
          />
        </label>
      </div>

      <div className="text-center">
        <div className="text-5xl md:text-8xl text-white font-bold font-apple2mono">
          {countdownStyle === 'fractional' ? integerDays : ''}
          {countdownStyle === 'fractional' ? (
            <span className="text-2xl md:text-4xl text-neutral-200 text-opacity-75 font-normal -ml-2 md:-ml-4">.{fractionalDays.slice(2)}</span>
          ) : (
            traditionalCountdown()
          )}
        </div>
        <p className="text-sm md:text-2xl text-neutral-400 text-opacity-75 font-apple2mono mb-8">
          {countdownStyle === 'fractional' ? 'days' : ''} till {desc || (new Date().getFullYear() + 1)}
        </p>
      </div>
      <a href="https://www.ishanshah.me" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 opacity-75 text-white py-1 px-2 rounded text-xs">built by ishan</a>
      <a href="https://buildspace.so/home" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 opacity-75 text-white py-1 px-2 rounded text-xs">inspired by buildspace</a>
    </div>
  );
}