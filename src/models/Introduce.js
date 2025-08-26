import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StatSchema = new Schema({
  label: String,
  value: String,
});


const SomethingAboutSchema = new Schema({
  title: String,
  subtitle: String,
  paragraphs: [String],
  stats: [StatSchema],
  image: String,
});

const VideoSectionSchema = new Schema({
  poster: String,
  videoUrl: String,
});

const RoadSectionSchema = new Schema({
  title: String,
  image: String,
});

const MissionVisionSchema = new Schema({
  title: String,
  text: String,
  image: String,
});

const BehaviorRulesSchema = new Schema({
  banner: String,
  mission: MissionVisionSchema,
  vision: MissionVisionSchema,
});

const CoreValueItemSchema = new Schema({
  title: String,
  text: String,
});

const CoreValueSchema = new Schema({
  title: String,
  image: String,
  values: [CoreValueItemSchema],
});

const TestimonialSchema = new Schema({
  img: String,
  text: String,
  author: String,
  position: String,
});

const IntroduceSchema = new Schema({
  banner: String,
  somethingAbout: SomethingAboutSchema,
  videoSection: VideoSectionSchema,
  roadSection: RoadSectionSchema,
  behaviorRules: BehaviorRulesSchema,
  coreValue: CoreValueSchema,
  testimonials: [TestimonialSchema],
}, { timestamps: true });

export default model("Introduce", IntroduceSchema);


