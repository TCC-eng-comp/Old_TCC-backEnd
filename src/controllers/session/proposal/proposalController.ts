import Proposal from '../../../models/proposal/proposalModel'
import { professor } from '../../../middlewares/permition'
import ArisError from '../../../models/arisErrorModel'
import Data from '../../../models/dataModel'

import express, { Request, Response } from 'express'
const route = express.Router()

route.post('/get/:page', async (req: Request, res: Response) => {
  const page = parseInt(req.params.page)
  const { ids, titles, version, status, categories, users, created_at, updated_at } = req.body
  const filters = {
    ids,
    titles,
    version,
    status,
    categories,
    users,
    created_at,
    updated_at
  }

  try {
    Data.validate(filters, 'proposal_get')

    const proposals = await Proposal.get.ids(filters, page)

    if (typeof proposals === 'string') return res.status(200).send({ Success: true, Message: 'Fecth complete!', list: proposals })

    const list = Data.processing(proposals)

    res.status(200).send({ Success: true, Message: 'Fecth complete!', list })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Fetch')
    return res.status(result.status).send(result.send)
  }
})

route.post('/post', professor, async (req: Request, res: Response) => {
  const { _user_id, title, version, status, categories } = req.body

  try {
    Data.validate({ title, version, status, categories }, 'proposal_post')

    const proposal = new Proposal({
      title,
      version,
      status,
      categories,
      user_id: _user_id
    })
    await proposal.insert()

    res.status(200).send({
      Success: true,
      Message: 'Proposal created!',
      id: proposal.id_proposal,
      title,
      version,
      status,
      categories
    })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Creation')
    return res.status(result.status).send(result.send)
  }
})

route.post('/update/:id', professor, async (req: Request, res: Response) => {
  const { _user_id, title, version, status, categories } = req.body
  const proposal_id = parseInt(req.params.id)

  try {
    Data.validate({ title, version, status, categories }, 'proposal_patch')

    const proposal = await Proposal.getProposal(_user_id, proposal_id)
    await proposal.update({ title, version, status, categories })

    res.status(200).send({
      Success: true,
      Message: 'Proposal updated!',
      proposal_id,
      title: title || 'Not updated',
      version: version || 'Not updated',
      status: status || 'Not updated',
      categories: categories || 'Not updated'
    })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Update')
    return res.status(result.status).send(result.send)
  }
})

route.post('/delete/:id', professor, async (req: Request, res: Response) => {
  const proposal_id = parseInt(req.params.id)
  const { _user_id } = req.body

  try {
    const proposal = await Proposal.getProposal(_user_id, proposal_id)
    await proposal.delete()

    res.status(200).send({ Success: true, Message: 'Proposal deleted!', proposal_id })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Delete')
    return res.status(result.status).send(result.send)
  }
})

export default route