import allRoutes from "../routes/allRoutes.js";

const configRoutes = (app) => {
    //Config routes here
    app.use('/api', allRoutes.userRoutes);
    app.use('/api/submission', allRoutes.submissionRoutes);
}

export default configRoutes;
