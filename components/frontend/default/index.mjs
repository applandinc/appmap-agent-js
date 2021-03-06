import Session from "./session.mjs";
import Trace from "./trace.mjs";
import Recording from "./recording.mjs";
import Track from "./track.mjs";

export default (dependencies) => {
  const {
    util: { createCounter, incrementCounter },
    instrumentation: {
      createInstrumentation,
      instrument,
      getInstrumentationIdentifier,
    },
  } = dependencies;
  const { createSession, initializeSession, terminateSession } =
    Session(dependencies);
  const { traceFile, traceGroup } = Trace(dependencies);
  const { createTrack, controlTrack } = Track(dependencies);
  const { createRecording, ...RecordingLibrary } = Recording(dependencies);
  return {
    createFrontend: (configuration) => ({
      track_counter: createCounter(0),
      session: createSession(configuration),
      recording: createRecording(configuration),
      instrumentation: createInstrumentation(configuration),
    }),
    initializeFrontend: ({ session }) => initializeSession(session),
    terminateFrontend: ({ session }, termination) =>
      terminateSession(session, termination),
    createTrack: ({ track_counter }, options) =>
      createTrack(incrementCounter(track_counter), options),
    declareGroup: ({ session }, group) => traceGroup(session, group),
    getInstrumentationIdentifier: ({ instrumentation }) =>
      getInstrumentationIdentifier(instrumentation),
    instrument: ({ instrumentation, session }, kind, path, code1) => {
      const { code: code2, file } = instrument(
        instrumentation,
        kind,
        path,
        code1,
      );
      let message = null;
      if (file !== null) {
        message = traceFile(session, file);
      }
      return {
        message,
        code: code2,
      };
    },
    controlTrack: ({ session }, track, action) =>
      controlTrack(session, track, action),
    ...RecordingLibrary,
  };
};
