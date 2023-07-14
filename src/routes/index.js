const { Router } = require("express")
const router = Router();
const { get, run } = require('./../services/db');


const { patchValidator, postValidator } = require('./../middlewares/validators');

router.get('/', async (req, res, next) => {
    try {
        const toDos =await get('SELECT * FROM todos')
        const data = toDos.map((toDo) => {
            return {
                id: toDo.id,
                title: toDo.title,
                description: toDo.description,
                data_time: toDo.data_time,
                data_time_edit: toDo.data_time_edit,
                isDone: Boolean(toDo.isDone)//,
                //create_at: toDo.create_at
            };
        });
        res.status(200).json({ message: 'To-dos retrieved successfully', data });
        console.log("GET")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error en el servidor', error });
    }
});

router.post('/', postValidator, async(req, res, next) => {
    try {
        const { title, description } = req.body;
        
        const data = await run('INSERT INTO todos (title,description) VALUES (?, ?)', [title, description]);
        //const toDos=await get('SELECT *FROM todos ')
        res.status(200).json({
            message: "To-do created successfully", toDO: {
                id: data.lastID,
                title,
                description,
                data_time: data.data_time,
                data_time_edit: data.data_time_edit,
                isDone: Boolean(data.isDone)
            }
        });
        console.log("POST")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error en el servidor', error });
    }
    
})

router.patch('/:id',patchValidator, async(req, res, next) => {

    try {
        const { id } = req.params;
        const data = await get('SELECT * FROM todos WHERE id=?', [id]);
        if (data.length === 0) {
            console.log(id)
            return res.status(404).json({ message: `El ID no de encuentra en la db` });
        }
        const { title, description, isDone, isComplete } = req.body;
        let done = isDone;
        const isDoneNumber = Number(isDone)
        
        if (title !== undefined) {
            await run('UPDATE todos set title=?, data_time_edit= CURRENT_TIMESTAMP WHERE id=?',
            [title, id]
            );
        }
        if (description !== undefined) {
            await run('UPDATE todos set description=?, data_time_edit=CURRENT_TIMESTAMP  WHERE id=?',
            [description, id]
            );
        }
        if (isDone !== undefined) {
            await run('UPDATE todos set isDone=?, data_time_edit= CURRENT_TIMESTAMP WHERE id=?',
            [isDoneNumber, id]
            );
        }
            
            if (isComplete === true) {
                done=false
                await run('UPDATE todos set isDone=0, data_time_edit= CURRENT_TIMESTAMP WHERE id=?',
                    [id]
                );
            }
            if (isComplete === false) {
                done=true
                await run('UPDATE todos set isDone=1, data_time_edit= CURRENT_TIMESTAMP WHERE id=?',
                    [id]
                );
            }
        
        res.status(200).json({
            message: `To-do updated successfully`, toDO: {
                id,
                title,
                description,
                data_time: data.data_time,
                data_time_edit: data.data_time_edit,
                isDone: done
            }
        })
        console.log("PATCH")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error en el servidor', error });
    }
    
})

router.delete('/:id', async (req, res, next) => {
    //console.log(req.params);
    try {
        const { id } = req.params;
        const toDo = await get('SELECT * FROM todos WHERE id=?', [id]);
        if (toDo.length === 0) {
            return res.status(404).json({ message: `El ID no de encuentra en la db` });
        }
        await run('DELETE FROM todos WHERE id=?', [id]);
        
        res.status(200).json({
            message: `To-do deleted successfully`,
            toDo: {
                id: toDo[0].id,
                title: toDo[0].title,
                description: toDo[0].description,
                data_time: toDo[0].data_time,
                data_time_edit: toDo[0].data_time_edit,
                isDone: Boolean(toDo[0].isDone)
            }
        })
        console.log("DELETE")
    } catch (error) {
        res.status(500).json({ message: 'error en el servidor', error });
    }
})


module.exports = router;