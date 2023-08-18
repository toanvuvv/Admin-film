import React, { Component } from "react";
import { Table , Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../helpers/http";
import { deleteMovieByID } from "../redux/actions/movie";
import { connect } from "react-redux";
class MovieTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
		};
	}
	
	async componentDidMount() {
		const response = await http().get("movies");
		this.setState({
			movies: response.data.results,
		});
	}
	render() {
		const { movies } = this.state;

		console.log(movies);
		return (
			<div>
				<Link to="/admin-panel/manage_movie/add">Add Movie</Link>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Option</th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => {
							return (
								<tr key={String(movie.id)}>
									<td>{movie.id}</td>
									<td>{movie.title}</td>
									<td>
										<Link
											to={`/admin-panel/manage_movie/edit/${movie.id}`}
											className="btn btn-sm btn-warning"
										>
											Edit
										</Link>{" "}
										<Button
											type="radio"
											size="sm"
											variant="light"
											className="btn-time"
											onClick={() =>{
												this.props.deleteMovieByID(movie.id);
												window.location.reload()
											}
											}
										>
											DELETE
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = { deleteMovieByID };

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);